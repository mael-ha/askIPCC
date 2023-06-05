Rails.application.routes.draw do
  root to: 'root#index'
  resources :questions, only: %i[new create]
  mount ActionCable.server => '/cable'
end
