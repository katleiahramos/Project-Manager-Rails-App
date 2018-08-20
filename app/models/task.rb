class Task < ApplicationRecord
  belongs_to :user
  belongs_to :project


  # validates :description, :due_date, presence: true
  validates :description, presence: true
  validate :due_date_cannot_be_in_the_past

  scope :completed_tasks, -> {where(completed: true)}
  scope :over_due, -> {where("due_date > ?", Date.today)}



  def due_date_cannot_be_in_the_past
    if due_date.present? && due_date < Date.today
      errors.add(:due_date, "can't be in the past")
    end
  end


end
