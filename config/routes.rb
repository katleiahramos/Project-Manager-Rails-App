Rails.application.routes.draw do
  # get 'sessions/new'
  # get 'sessions/create'
  # get 'sessions/destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  root "static#welcome"



  resources :sessions

  resources :users, only: [:new, :create] do
    resources :tasks, only: [:index, :show, :new]
  end

  resources :projects do
    resources :tasks, only: [:new, :show, :index, :create]
  end


  get '/signout', to: 'sessions#destroy'

  get '/tasks/:id/complete', to: "tasks#complete"

  get '/auth/facebook/callback' => 'sessions#create'

  get '/tasks/indexCompleted' => 'tasks#indexCompleted'

  get '/users/most_projects', to: "users#most_projects"

  resources :tasks
end
