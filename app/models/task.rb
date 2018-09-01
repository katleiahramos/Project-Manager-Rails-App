class Task < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :project, optional: true



  validates :name, presence: true
  validate :due_date_cannot_be_in_the_past

  scope :completed_tasks, -> {where(completed: true)}
  scope :over_due, -> {where("due_date > ?", Date.today)}
  scope :by_date_completed, ->  {order("date_completed DESC")}

  # custom validation
  def due_date_cannot_be_in_the_past
    if due_date.present? && due_date < Date.today
      errors.add(:due_date, "can't be in the past")
    end
  end


end
