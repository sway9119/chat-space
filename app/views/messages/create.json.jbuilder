json.user_name  @message.user.name
json.date       format_posted_time(@message.created_at)
json.content    @message.content
json.image_url  @message.image.url
