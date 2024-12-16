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
Projects to Keywords (Reciprocal)

# User flow:
A user logs into the project and is presented with a homepage.

From the homepage, the user can go to the nav and click on projects. 

This will have a list of existing projects with the brand name and logo and **ALSO** an option to create a new brand.

If the user clicks on an existing project, it will take them to a route where they can see the logo and brand name in the hero on page//
**AND** they can see the nGram analysis for the last upload.
Future buildout may include previous runs, but each upload will delete the last

If the user chooses to create a new brand, it will take them to a new route and they will have the option to create a new brand with the logo, name
this will then redirect them back to the page with a list of brands where they can click on the new project and see the option to upload keywords



