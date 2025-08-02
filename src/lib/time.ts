export function formatTimestamp(timestamp: Date) {
   const now = new Date();
   const postDate = new Date(timestamp);
   const diff = now.getTime() - postDate.getTime();

   const minutes = Math.floor(diff / 60000);
   const hours = Math.floor(minutes / 60);

   if (minutes < 60) {
      return `${minutes}m ago`;
   }

   if (hours < 24) {
      return `${hours}h ago`;
   }

   return postDate.toLocaleDateString();
}
