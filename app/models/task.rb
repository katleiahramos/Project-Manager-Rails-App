class Task < ApplicationRecord
  validates :description, :due_date, presence: true

  belongs_to :user
  belongs_to :project


end
