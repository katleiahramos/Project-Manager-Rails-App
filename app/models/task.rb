class Task < ApplicationRecord
  validates :description, presence: true

  belongs_to :user
  belongs_to :project


end
