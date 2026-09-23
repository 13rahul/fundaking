import authorConfig from "@/config/author.json";
import { plainify } from "@/lib/utils/textConverter";

export function resolveAuthorImage(
  authorName: string,
  authorImage?: string,
): string {
  if (plainify(authorName) === plainify(authorConfig.name)) {
    return authorConfig.image;
  }
  return authorImage ?? "/images/blog/author-1.png";
}
