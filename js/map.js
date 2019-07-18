var myMap;
ymaps.ready(init);
function init () {
   myMap = new ymaps.Map('map', {
      center: [55.751400, 37.618909],
      zoom: 10,
      controls: []
   });
   myMap.behaviors.disable('scrollZoom');

   MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      ' <div class="map__popup top">' +
      ' <a class="map__close" href="#"></a>' +
       ' <div class="map__arrow"> </div>' +
       ' <div class="map__popup-inner">' +
       '$[[options.contentLayout observeSize minWidth=500 maxWidth=500 maxHeight=373]]' +
       ' </div>' +
      ' </div>', {

      build: function () {
         this.constructor.superclass.build.call(this);
         this._$element = $('.map__popup', this.getParentElement());
         this.applyElementOffset();
      this._$element.find('.map__close')
             .on('click', $.proxy(this.onCloseClick, this));
      },

       clear: function () {
         this._$element.find('.map__close')
            .off('click');
         this.constructor.superclass.clear.call(this);
      },

      onSublayoutSizeChange: function () {
         MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

         if(!this._isElement(this._$element)) {
             return;
          }
          this.applyElementOffset();
          this.events.fire('shapechange');
       },

       applyElementOffset: function () {
          this._$element.css({
             left: -(this._$element[0].offsetWidth / 2),
             top: -(this._$element[0].offsetHeight + this._$element.find('.map__arrow')[0].offsetHeight)
          });
       },

       onCloseClick: function (e) {
          e.preventDefault();
          this.events.fire('userclose');
       },

       getShape: function () {
          if(!this._isElement(this._$element)) {
             return MyBalloonLayout.superclass.getShape.call(this);
          }
          var position = this._$element.position();
          return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
             [position.left, position.top], [
             position.left + this._$element[0].offsetWidth,
             position.top + this._$element[0].offsetHeight + this._$element.find('.map__arrow')[0].offsetHeight]
          ]));
       },

       _isElement: function (element) {
          return element && element[0] && element.find('.map__arrow')[0];
       }
    }),

    MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
       '$[properties.balloonContent]'
    ),
    myPlacemark = new ymaps.Placemark(
       [55.793915, 37.612317] , {
       hintContent: 'iResource',
       balloonHeader: '',
       balloonContent: `
       <div class="map__content">
        <img src="img/map/map__content_1.jpg" alt="Фото на карте" width="200" height="373" class="map__img">
        <div class="map__info">
          <h2 class="map__title">ЖК Премиум-квартал JAZZ</h2>
          <span class="map__subway">
            <svg class="map__icon metro__icon metro__icon_lime" width="16" height="12" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 12">
              <path d="M191.02946,1888l2.60936,-4.5354l1.08336,3.07183h-0.87476v1.35178h5.21148v-1.35178h-0.99468l-3.74354,-9.84756l-3.29122,6.06305l-3.29121,-6.06305l-3.74355,9.84756h-0.9947v1.35178h5.2115v-1.35178h-0.87477l1.08336,-3.07183l2.60937,4.5354" id="Path-0"/>
              <g transform="matrix(1,0,0,1,-183,-1876)">
                <use xlink:href="#Path-0" fill-opacity="1"/>
              </g>
            </svg>
            Марьина роща
          </span>
          <span class="map__time">2 минуты пешком</span>
          <p class="map__address">Марьина роща, ул. Сущевский вал, 49</p>
          <table class="map__table">
            <tr class="map__row">
              <td class="map__cell map__cell_bordered-bottom">1-комнатные от 30&nbsp;м&sup2;</td>
              <td class="map__cell map__cell_bordered-bottom">6 900 000 р.</td>
            </tr>
            <tr class="map__row">
              <td class="map__cell map__cell_bordered-bottom">2-комнатные от 75&nbsp;м&sup2;</td>
              <td class="map__cell map__cell_bordered-bottom">от 22 900 000 р.</td>
            </tr>
            <tr class="map__row">
              <td class="map__cell map__cell_bordered-bottom">3-комнатные от 74&nbsp;м&sup2;</td>
              <td class="map__cell map__cell_bordered-bottom">от 17 400 000 р.</td>
            </tr>
            <tr class="map__row">
              <td class="map__cell map__cell_bordered-bottom">4-комнатные от 177&nbsp;м&sup2;</td>
              <td class="map__cell map__cell_bordered-bottom">от 63 200 000 р.</td>
            </tr>
            <tr class="map__row">
              <td class="map__cell map__cell_padding">Стадия готовности:</td>
              <td class="map__cell map__cell_padding">На заселении</td>
            </tr>
            <tr class="map__row">
              <td class="map__cell">Ипотека:</td>
              <td class="map__cell">Есть</td>
            </tr>
            <tr class="map__row">
              <td class="map__cell">Отделка:</td>
              <td class="map__cell">Возможна</td>
            </tr>
          </table>
          <a href="#" class="map__link">Заказать просмотр</a>
        </div>
        </div>`
    }, {
       iconLayout: 'default#imageWithContent',
       iconImageHref: 'img/map/map__mark.svg',
       iconImageSize: [39, 39],
       iconImageOffset: [-6, -10],
       balloonShadow: false,
       balloonLayout: MyBalloonLayout,
       balloonContentLayout: MyBalloonContentLayout,
       balloonPanelMaxMapArea: 0,
       hideIconOnBalloonOpen: false,
       balloonOffset: [-520, -100]
    });
    myMap.geoObjects.add(myPlacemark);
}