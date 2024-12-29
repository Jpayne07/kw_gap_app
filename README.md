# What this app does?
At a high level, a user can track keyword data for their client projects and view charts about the data. The dashboard will include sections related to the data. This will include nGram analysis and show most common phrases.

Future iterations will pass this data into extensive filtering and produce and output that is helpful for keyword research.

 ## Models
This app will have 4 models

1. Users model
2. Projects model
3. Keyword model
4. Total keywords for all projects

## Relationships
One to Many
Users to Projects
Project to Keywords

## Many to Many
user to Keywords (Reciprocal)

# User flow:
A user logs into the project and is presented with a homepage.

From the homepage, the user can go to the nav and click on projects. 

This will have a list of existing projects with the brand name and logo and **ALSO** an option to create a new brand.

If the user clicks on an existing project, it will take them to a route where they can see the logo and brand name in the hero on page//
**AND** they can see the nGram analysis for the last upload.
Future buildout may include previous runs, but each upload will delete the last

If the user chooses to create a new brand, it will take them to a new route and they will have the option to create a new brand with the logo, name
this will then redirect them back to the page with a list of brands where they can click on the new project and see the option to upload keywords

Pseudocode logic
For the **user** model, I will need to have the following:
### Session storage
### Name column
### Username column
### Projects association - one to many
### ID

For the **projects** model, I will need to have the following:
### Session storage
### Brand Name column
### Logo column
### Keyword association - one to many
### User association (project owner)
### ID

For the **keywords** model I will need the following:
### Session storage
### Keyword column
### Volume column
### ID

For the **user to keyword** *permissions*  association model I will need the following:
### ID
### Permissions
### Project_id
### keyword_id

// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  id integer [primary key]
  username varchar
  name varchar
  created_at timestamp
}

Table projects {
  id integer [primary key]
  brand_name varchar
  logo varchar [note: 'URL or binary data for the logo']
  created_at timestamp
}

Table project_collaborators {
  id integer [primary key]
  user_id integer [not null]
  project_id integer [not null]
  role varchar [note: 'User role on the project, e.g., Owner, Editor, Viewer']
  date_joined timestamp [default: `now()`]
}

Ref: project_collaborators.user_id > users.id // many-to-one
Ref: project_collaborators.project_id > projects.id // many-to-one


## Pages ##
The app will have the following
- Homepage
- Signup page
- Login page
- Projects page
- Project Page
