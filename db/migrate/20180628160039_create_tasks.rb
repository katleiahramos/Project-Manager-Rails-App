class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name
      t.datetime :due_date
      t.string :description
      t.integer :user_id
      t.integer :project_id
      t.boolean :completed, :default => false
      t.datetime :date_completed, :default => null 

      t.timestamps
    end
  end
end
