# RecipeFinder

A recipe-sharing web app where users can post recipes with photos, browse by category, search, and discuss in threaded comments.

## Features

**Authentication**
- Sign up, log in and log out, powered by Supabase Auth
- Create and edit pages are only accessible to logged-in users, and edit is limited to the recipe's author

**Recipes**
- Anyone can browse and read recipes
- Logged-in users can create, edit and delete their own recipes
- Search recipes by title
- Browse recipes by category through a dynamic route *_(/category/[name])_*
- "More from this author" section on each recipe page

**Images**
- Upload up to 4 photos per recipe, stored in a Supabase Storage bucket
- Add more photos or remove existing ones when editing
- Responsive photo grid on the recipe page that adapts to the number of photos

**Comments**
- Anyone can read comments, logged-in users can post them
- Nested replies
- Comment authors can delete their own comments, and recipe authors can delete any comment on their recipes

**UX**
- Loading and error states 
- Toast notifications for success and failure


## Tech Stack

- **Next.js** (App Router) with **TypeScript**
- **Supabase**: Auth, PostgreSQL, Storage and Row Level Security
- **TanStack Query** for data fetching, caching and revalidation
- **React Hook Form** + **Zod** for form validation
- **Tailwind CSS** for styling
- **Sonner** for toast notifications

## Design Patterns
 
| Pattern | Where it's used |
|---|---|
| **Composite** | Nested comments. A CommentNode contains child CommentNode's, and CommentItem renders itself recursively, so a single comment and a whole thread are handled the same way |
| **Singleton** | **getQueryClient()** keeps one shared QueryClient per browser tab (a fresh one per request on the server so users' data never mixes) |
| **Facade** | Server Actions like CreateRecipe hide several steps (validation, recipe insert, image upload, image rows) behind a single call |
| **Observer** | TanStack Query. After a mutation, **invalidateQueries** notifies every component subscribed to that query key, which refetches and updates |


## Database

| Table | Purpose |
|---|---|
| **users** | Public profile (username, email), linked to Supabase Auth |
| **categories** | Recipe categories |
| **recipes** | Recipes, each belonging to one user and one category |
| **recipe_images** | Photos for a recipe (one-to-many), with a *_position_* for ordering |
| **comments** | Comments on recipes, with a self-referencing *_parent_comment_id_* for nested replies |

