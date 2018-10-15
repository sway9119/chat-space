$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var content = message.content ? `<p class="chat-main__message-content">${message.content}</p>` : "";
    var image = message.image_url ? `<img class='chat-main__message-body' src="${message.image_url}">` : "";
    var html = `
                <div class="chat-main__body--messages-list" data-id=${message.id}>
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
  function scrollend() {
    $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 'fast');
  }
  function insertHTML(message) {
    var html = buildHTML(message);
    $('.chat-main__body').append(html);
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
      insertHTML(data)
      scrollend()
      $('.chat-main__footer-form')[0].reset();
    })
    .fail(function() {
      alert('error');
    })
    .always(function(){
      $('.submit-btn').prop("disabled", false);
    })
  });

  var interval = setInterval(function() {
    var last_id = $('.chat-main__body--messages-list:last').data('id')
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
   $.ajax({
    url: location.href.json,
    data: {last_id: last_id },
    dataType: 'json'
  })
  .done(function(addmessages) {
    addmessages.forEach(function(message) {
      if (message.id > last_id ) {
        insertHTML(message)
      }
      scrollend();
    });
  })
  .fail(function(data) {
    alert('自動更新に失敗しました');
  });
  } else {
  clearInterval(interval);
}}, 5000 );
});
