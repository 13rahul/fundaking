# E-E-A-T Grader Tool - Enhancement Implementation Guide

## Features Implemented

### ✅ 1. Metadata Extraction (DONE)
- Title tag
- Meta description
- Open Graph tags (og:title, og:description, og:image)
- First 10 images with src, alt, width, height, loading attributes

### ⏳ 2. Detailed Findings for Render-Blocking Scripts

**Location:** Around line 480 in eeat-grader.php

**Replace the render-blocking check with:**

```php
// Check for render-blocking resources
$renderBlockingScripts = 0;
$blockingScriptsList = [];

foreach ($scripts as $script) {
    $src = $script->getAttribute('src');
    $async = $script->getAttribute('async');
    $defer = $script->getAttribute('defer');
    
    if (!empty($src) && empty($async) && empty($defer)) {
        $renderBlockingScripts++;
        $blockingScriptsList[] = $src;
    }
}

$renderBlockPass = $renderBlockingScripts < 3;
addCheck('performance', 'render_blocking', $renderBlockPass, 'Render-Blocking Scripts', "$renderBlockingScripts scripts block rendering (Use async/defer attributes)", 15, $blockingScriptsList);
```

### ⏳ 3. Expandable Cards with Details

**Add JavaScript before `</body>` tag:**

```javascript
<script>
document.addEventListener('DOMContentLoaded', function() {
    const checklistItems = document.querySelectorAll('.checklist-item');
    
    checklistItems.forEach(item => {
        const detailsBtn = item.querySelector('.show-details-btn');
        if(detailsBtn) {
            detailsBtn.addEventListener('click', function() {
                const detailsPanel = item.querySelector('.details-panel');
                detailsPanel.classList.toggle('active');
                this.textContent = detailsPanel.classList.contains('active') ? 'Hide Details' : 'Show Details';
            });
        }
    });
});
</script>
```

**Update checklist item HTML (around line 550):**

```php
<div class="checklist-item <?php echo $res['pass'] ? 'pass' : 'fail'; ?>">
    <!-- existing content -->
    
    <?php if(isset($detailedFindings[$key])): ?>
        <button class="show-details-btn">Show Details</button>
        <div class="details-panel">
            <ul>
                <?php foreach($detailedFindings[$key] as $detail): ?>
                    <li><?php echo htmlspecialchars($detail); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>
</div>
```

### ⏳ 4. Email Gate for PDF Download

**Create new file: `download-report.php`**

```php
<?php
session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $reportData = $_POST['report_data'] ?? '';
    
    if($email && $reportData) {
        // Save email to database/file
        file_put_contents('leads.txt', $email . "\n", FILE_APPEND);
        
        // Generate PDF (using TCPDF or similar)
        // For now, just allow download
        $_SESSION['can_download'] = true;
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid email']);
    }
}
?>
```

**Add download button in results section:**

```html
<button onclick="showEmailModal()" class="cta-btn">
    <i class="fas fa-download"></i> Download Full Report (PDF)
</button>

<!-- Email Modal -->
<div id="emailModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:999; align-items:center; justify-content:center;">
    <div style="background:var(--panel); padding:40px; border-radius:20px; max-width:500px;">
        <h3>Get Your Full SEO Report</h3>
        <p>Enter your email to download the complete audit as PDF:</p>
        <form id="emailForm">
            <input type="email" name="email" required placeholder="your@email.com" style="width:100%; padding:15px; margin:20px 0; border-radius:10px; border:1px solid var(--glass-border); background:rgba(255,255,255,0.05); color:white;">
            <button type="submit" class="cta-btn" style="width:100%;">Download Report</button>
        </form>
    </div>
</div>

<script>
function showEmailModal() {
    document.getElementById('emailModal').style.display = 'flex';
}

document.getElementById('emailForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    formData.append('report_data', JSON.stringify(<?php echo json_encode($auditResults); ?>));
    
    const response = await fetch('download-report.php', {
        method: 'POST',
        body: formData
    });
    
    if(response.ok) {
        window.print(); // For now, use browser print-to-PDF
        document.getElementById('emailModal').style.display = 'none';
    }
});
</script>
```

## Next Steps

1. Implement render-blocking details (5 min)
2. Add expandable cards JavaScript (10 min)
3. Create email gate modal (15 min)
4. Test all features together

## Testing Checklist

- [ ] Metadata extraction shows correctly
- [ ] Render-blocking scripts show list when clicked
- [ ] Email modal appears on download click
- [ ] Email is saved to leads.txt
- [ ] Print dialog opens after email submission
