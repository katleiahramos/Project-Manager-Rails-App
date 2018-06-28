# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


kat = User.create(username: "kat", password: "password", email: "email")
rails = Project.create(name: "rails")
task = Task.create(description: "complete show page", user_id: kat.id, project_id: rails.id)
task2 = Task.create(description: "show multiple tasks", user_id: kat.id, project_id: rails.id)
