$(function() {
    // Handler for .ready() called

    const depositTimesByType = [
        [
            {title: '6 месяцев', rate: 20, yearPart: 0.5},
            {title: '1 год', rate: 22, yearPart: 1},
            {title: '1,5 года', rate: 15, yearPart: 1.5},
            {title: '2 года', rate: 10, yearPart: 2}
        ],
        [
            {title: '3 месяца', rate: 20, yearPart: 0.25},
            {title: '6 месяцев', rate: 22, yearPart: 0.5},
            {title: '9 месяцев', rate: 23, yearPart: 0.75},
            {title: '1 год', rate: 24, yearPart: 1},
            {title: '1,5 года ', rate: 18, yearPart: 1.5},
            {title: '2 года', rate: 15, yearPart: 2}
        ]
    ];

    // el  = document.getElementById('deposit-type')
    // el.addEventListener('click', function() {})
    $('#deposit-type').on('change', function() {
        $('#deposit-time').empty();
        let selectedValue = $(this).val();
        if (selectedValue > 0) {
            let times = depositTimesByType[selectedValue - 1];
            for (i = 0; i< times.length; i++) {
                let item = times[i];
                let option = `<option value="${i}">${item.title}</option>`;
                $('#deposit-time').append($(option));
            };
        }
    });

    $('#run-count').on('click', function() {
        let depositType = $('#deposit-type').val();
        let depositTime = $('#deposit-time').val();
        let depositAmount = parseInt($('#deposit-amount').val(), 10);
        console.log(depositType);
        console.log(depositTime);
        console.log(depositAmount);
        if (depositType <= 0) {
            $('#results').empty().append($('<p>').text('Вы не выбрали вид вклада'));
            return;
        }
        if (depositTime == null) {
            $('#results').empty().append($('<p>').text('Вы не выбрали срок вклада'));
            return;
        }
        if (isNaN(depositAmount)) {
            $('#results').empty().append($('<p>').text('Введенная сумма не является числом'));
            return;
        }
        if (depositAmount <= 0) {
            $('#results').empty().append($('<p>').text('Вы не ввели сумму'));
            return;
        }

        let depositTypeStr = depositType == 1 ? 'Пополняемый' : 'Срочный';
        let depositTimeObj = depositTimesByType[depositType - 1][depositTime];
        let depositTimeStr = depositTimeObj.title;
        let resultFirstStr = `Вклад "${depositTypeStr}" на срок "${depositTimeStr}" на сумму ${depositAmount} руб`;
        $('#results').empty().append($('<p>').text(resultFirstStr));

        let resultAmount = Math.round(depositAmount * (1 + depositTimeObj.rate * depositTimeObj.yearPart / 100));
        let resultSecondStr = `В конце срока вы получите ${resultAmount} руб.`;
        $('#results').append($('<p>').text(resultSecondStr));
    });

});
