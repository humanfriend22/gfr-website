# Gael Force Robotics Website

This is the full codebase for the Gael Force Robotics Website. This page aims to
outline the structure, functionality, and permissions on this website.

One of the main features of this website is the ability to change the content of
teams and events on the fly. However, to better balance the benefits of
saturating with content before hand versus dynamically loading the content,
every page has the ability to perform with 3 behaviors when it comes to content
loading.

### 1. Fully Static (e.g. Home)

For example, although admins can modify the image on the homepage, the changes
will not be reflected until the site is completly rebuilt and redeployed.

### 2. Hybrid (e.g. Blog Posts)

These can be hydrated on build as much as possible but the site will also push
any new blog posts and events after requesting the database.

### 3. Fully Dynamic (Admin)

Admin pages will always pull the latest data from the Database.
