$(function(){
  function buildHTML(message){
    var content = message.content ? `<p class="chat-main__message-content">${message.content}</p>` : "none";
    var image = message.image_url ? `<img class='chat-main__message-body' src="${message.image_url}">` : "nothing";
    var html = `
                <div class="chat-main__body--messages-list">
                  <div class="chat-main__messege-name">${message.user_name}</div>
                  <div class="chat-main__messege-time">${message.date}</div>
                  <div class="chat-main__messege-body">
                    ${content}
                    ${image}
                  </div>
                </div>
              `
    return html;
  }
  $('.chat-main__footer-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body').append(html)
      $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 'fast');
      $('.chat-main__footer-form')[0].reset();
    })
    .fail(function() {
      alert('error');
    })
    .always(function(){
      $('.submit-btn').prop("disabled", false);
    })
  });
});
