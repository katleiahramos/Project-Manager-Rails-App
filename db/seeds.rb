# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Users
kat = User.create(email: "Kat@home.com", username: "Kat",  password: "password")
skylar = User.create(email: "Skylar@home.com", username: "Sky",  password: "password")
travis = User.create(email: "Travis@home.com", username: "Travis", password: "password")

#Projects
# rails = Project.create(name: "rails")
# ruby = Project.create(name: "ruby")
# cli = Project.create(name: "CLI")
#
#
# #Tasks
# task = Task.create(description: "complete show page",user_id: kat.id, project_id: rails.id, due_date: Date.today)
# task2 = Task.create(description: "show multiple tasks", user_id: kat.id, project_id: rails.id)
# task3 = Task.create(description: "Create command line design", user_id: skylar.id, project_id: cli.id, due_date: Date.today)
# task4 = Task.create(description: "make tic-tac-toe", user_id: travis.id, project_id: ruby.id, due_date: Date.today)
