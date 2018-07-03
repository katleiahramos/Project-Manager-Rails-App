# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project
- [x] Include at least one has_many relationship (x has_many y e.g. User has_many Recipes)
  project has many tasks, user has many tasks
- [x] Include at least one belongs_to relationship (x belongs_to y e.g. Post belongs_to User)
  tasks belong to a project and a user
- [x] Include at least one has_many through relationship (x has_many y through z e.g. Recipe has_many Items through Ingredients)
  user has many projects through tasks, projects have many users through tasks
- [x] The "through" part of the has_many through includes at least one user submittable attribute (attribute_name e.g. ingredients.quantity)
  tasks have a due_date and completed attribute, plus a description
- [x] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item)
  user -> username and password presence true
  project -> name presence true
  task -> due date and description presence true, custom validation of due date cannot be in the past
- [x] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes)
  Task model has -> over_due and completed scope methods 
- [x] Include signup (how e.g. Devise)
  user#new
- [x] Include login (how e.g. Devise)
  session#new
- [x] Include logout (how e.g. Devise)
  session#destroy
- [ ] Include third party signup/login (how e.g. Devise/OmniAuth)
- [x] Include nested resource show or index (URL e.g. users/2/recipes)
  user_tasks_path
- [ ] Include nested resource "new" form (URL e.g. recipes/1/ingredients)
- [x] Include form display of validation errors (form URL e.g. /recipes/new)

Confirm:
- [ ] The application is pretty DRY
- [ ] Limited logic in controllers
- [ ] Views use helper methods if appropriate
- [ ] Views use partials if appropriate
