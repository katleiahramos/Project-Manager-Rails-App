class TasksSerializer < ActiveModel::Serializer
  attributes :id, :description, :due_date
end
