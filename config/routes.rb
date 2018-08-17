Rails.application.routes.draw do
  # get 'sessions/new'
  # get 'sessions/create'
  # get 'sessions/destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  # root "static#welcome"

  root 'projects#index'

  get '/projects/test', to: 'projects#test'
  
  resources :sessions

  resources :users, only: [:new, :create] do
    resources :tasks, only: [:index, :show, :new]
  end

  resources :projects

  resources :tasks


  get '/signout', to: 'sessions#destroy'

  get '/tasks/:id/complete', to: "tasks#complete"

  #get 'tasks/:id/delete', to: "tasks#delete"

  get '/auth/facebook/callback' => 'sessions#create'

  # get 'projects/:id/delete', to: "projects#delete"

  get '/users/most_projects', to: "users#most_projects"
end
