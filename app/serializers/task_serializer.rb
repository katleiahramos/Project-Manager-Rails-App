class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :due_date
  belongs_to :user
  belongs_to :project
end
