Rails.application.routes.draw do
  root to: 'root#index'
  resources :questions, only: [:new, :create]
end
