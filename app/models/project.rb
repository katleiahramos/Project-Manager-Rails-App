class Project < ApplicationRecord
  validates :name, presence: true

  has_many :tasks
  has_many :users, through: :tasks
end
