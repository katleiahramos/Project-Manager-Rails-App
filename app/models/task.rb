class Task < ApplicationRecord
  validates :description, :due_date, presence: true

  belongs_to :user
  belongs_to :project

  validate :due_date_cannot_be_in_the_past

  def due_date_cannot_be_in_the_past
    if due_date.present? && due_date < Date.today
      errors.add(:due_date, "can't be in the past")
    end
  end


end
