class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :due_date, :name, :completed
  belongs_to :user
  belongs_to :project
end
