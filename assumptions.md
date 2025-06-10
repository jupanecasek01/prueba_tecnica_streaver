## Assumptions 

### Posts Api
- The number of posts is small (~100), so fetching all posts at once is acceptable and enables frontend pagination.
- Filtering by userId is expected to return a manageable subset of posts.

### Functionality
- The application is read-only: no create, update or delete operations were considered.
- Filtering uses exact userId values (numeric input).
- “Read more” button navigates to a detailed post page. Post details are accessed via dynamic route /posts/[id].
- 
### UI/UX
- Pagination is implemented on the client side with 9 posts per page.
- The homepage provides a clear entry point to explore posts.
- A debounced input prevents excessive API calls while typing a userId. The debounce delay is set to 750ms to balance responsiveness and request efficiency.
- If no posts are found for a filter, a message is shown.

### Offline and connection handling
- SWR is used for caching and revalidation on reconnect or focus.
- A loading indicator appears on slow connections using SWR’s onLoadingSlow.
- Basic error handling is in place for failed fetches.

### Technical decisions
- TailwindCSS was used for UI styling.
- A services layer abstracts API calls to allow easy future changes.

### Out of scope
- Authentication, write operations, and backend persistence were considered out of scope.
