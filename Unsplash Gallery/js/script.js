
$('document').ready(function () {
  apiFunction();

  function apiFunction() {
    var cardsSection1 = $('#cards-section-row-1');
    var cardsSection2 = $('#cards-section-row-2');
    var cardsSection3 = $('#cards-section-row-3');
    var section1RenderedCards = "";
    var section2RenderedCards = "";
    var section3RenderedCards = "";
    const apiUrl = 'https://api.unsplash.com/photos/?client_id=FxD7UGgfPDC9rxJtP_TtwVHnF3VTf2JOGNzvUQcSnsQ';

    fetch(apiUrl).then((r) => r.json()).then((json) => {
      console.log(json);

      function renderCards(counter, renderedHtml, cardsSection) {
        for (i = counter; i < json.length; i += 3) {
          renderedHtml +=
            '<div class="card-container" data-id="' + json[i].id + '" data-card-num=' + i + ' data-like-count=' + json[i].likes + '> ' +
            '    <img class="card-display-img" src="' + json[i].urls.regular + '" alt="' + json[i].alt_description + '" data-img-src="' + json[i].urls.regular + '"> ' +
            '    <div class="hover-elements"> ' +
            '        <div class="plus"> ' +
            '            <svg width="32" height="32" class="utUL6" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en-US">A plus sign</desc><path d="M14 3h4v26h-4zM29 14v4h-26v-4z"></path></svg> ' +
            '        </div> ' +
            '        <div class="wishlist"> ' +
            '            <svg width="32" height="32" class="TrVF8" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en-US">A heart</desc><path d="M17.4 29c-.8.8-2 .8-2.8 0l-12.3-12.8c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.3 0l2.4 2.8 2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4l-12.2 12.8z"></path></svg> ' +
            '        </div> ' +
            '        <a href="' + json[i].links.download + '" class="download" target="_blank" onclick="event.stopPropagation()"> ' +
            '            <svg width="32" height="32" class="c_c7b" viewBox="0 0 32 32" version="1.1" aria-hidden="false"><desc lang="en-US">Arrow pointing down</desc><path d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z"></path></svg> ' +
            '        </a> ' +
            '        <a class="profile-desc" href="' + json[i].user.portfolio_url + '" target="_blank"> ' +
            '            <img src="' + json[i].user.profile_image.small + '" alt="profile-img"> ' +
            '            <span class="user-name">' + json[i].user.name + '</span> ' +
            '        </a> ' +
            '    </div> ' +
            '</div> '
        }
        cardsSection.html(renderedHtml);
      }

      renderCards(0, section1RenderedCards, cardsSection1)
      renderCards(1, section2RenderedCards, cardsSection2)
      renderCards(2, section3RenderedCards, cardsSection3)



      $('.card-container').on('click', function () {
        var currentCardImgSrc = $(this).find('.card-display-img').attr('data-img-src');
        var currentCardLikeCount = $(this).attr('data-like-count');
        var currentCardNum = $(this).attr('data-card-num');
        var currentCardUserName = $(this).find('.user-name').text();
        var currentCardUserImg = $(this).find('.profile-desc img').attr('src');

        $('.popup-overlay').removeClass('d-none');
        $('.popup-img').attr('src', currentCardImgSrc);
        $('.popup-overlay').attr('data-popup-card-num', currentCardNum);
        $('.pop-user-name').text(currentCardUserName);
        $('.pop-user-pic').attr('src', currentCardUserImg);
        $('.like-count').text(currentCardLikeCount);
      })


      $('.popup-close-evt').on('click', function () {
        $(this).parents('.popup-overlay').addClass('d-none');
      })

      $('.next-arrow').on('click', function () {
        var currentPopupCardNum = $('.popup-overlay').attr('data-popup-card-num');
        var cardToShow = +currentPopupCardNum + 1;
        var nextCard = $('[data-card-num="' + cardToShow + '"]')
        var nextCardImgSrc = nextCard.find('.card-display-img').attr('data-img-src');
        var nextCardLikeCount = nextCard.attr('data-like-count');
        var nextCardProfileImgSrc = nextCard.find('.profile-desc img').attr('src');
        var nextCardUserName = nextCard.find('.user-name').text();

        $('.popup-img').attr('src', nextCardImgSrc);
        $('.popup-overlay').attr('data-popup-card-num', nextCard.attr('data-card-num'));
        $('.pop-user-name').text(nextCardUserName);
        $('.popup-img').removeClass('zoom');
        $('.pop-user-pic').attr('src', nextCardProfileImgSrc);
        $('.like-count').text(nextCardLikeCount);
      })

      $('.prev-arrow').on('click', function () {
        var currentPopupCardNum = $('.popup-overlay').attr('data-popup-card-num');
        var cardToShow = +currentPopupCardNum - 1
        var prevCard = $('[data-card-num="' + cardToShow + '"]');
        var prevCardImgSrc = prevCard.find('.card-display-img').attr('data-img-src');
        var prevCardLikeCount = prevCard.attr('data-like-count');
        var prevCardProfileImgSrc = prevCard.find('.profile-desc img').attr('src');
        var prevCardUserName = prevCard.find('.user-name').text();

        $('.popup-img').attr('src', prevCardImgSrc);
        $('.popup-overlay').attr('data-popup-card-num', prevCard.attr('data-card-num'));
        $('.pop-user-name').text(prevCardUserName);
        $('.popup-img').removeClass('zoom');
        $('.pop-user-pic').attr('src', prevCardProfileImgSrc);
        $('.like-count').text(prevCardLikeCount);
      })

      $('.popup-img').on('click', function () {
        $(this).toggleClass('zoom')
      })

    })

  }

})
