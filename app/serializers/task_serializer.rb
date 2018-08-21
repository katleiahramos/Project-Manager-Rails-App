class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :due_date, :name
  belongs_to :user
  belongs_to :project
end
