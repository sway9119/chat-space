class MessagesController < ApplicationController
  def index
    @user = current_user
    @group = Group.find(params[:group_id])
  end
end
