Rails.application.routes.draw do
  # get 'sessions/new'
  # get 'sessions/create'
  # get 'sessions/destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  root "static#welcome"

  resources :sessions
  resources :users, only: [:show, :new, :create] do
    resources :projects, only: [:index, :show]
  end

  resources :projects, only: [:index, :show]

  get '/signout', to: 'sessions#destroy'
end
