$(() => {
    $('#map-tab-bar-button').click(() => {
        setTimeout(() => {
            let indicator = $('.map').width() / 15;

            console.log(indicator);

            $('.map-zone').each((index, item) => {
                let itemJq = $(item);
                let moveData = itemJq.attr('data-move');
                let moveArr = [0, 0];

                if (moveData) {
                    [moveArr[0], moveArr[1]] = moveData.split(', ');

                    moveArr[0] = +moveArr[0];
                    moveArr[1] = +moveArr[1];
                }

                itemJq
                    .css('width', `${indicator}px`)
                    .css('height', `${indicator}px`)
                    .css('margin-top', `-${indicator}px`)
                    .css('margin-left', `-${indicator}px`)
                    .css('border-radius', `${indicator / 2}px`)
                    .css('transform',
                        `translate(calc(${indicator}px + ${moveArr[0]}%), calc(${indicator}px + ${moveArr[1]}%))`
                    )
                    .removeClass('hidden');
            });
        }, 100);
    });
});