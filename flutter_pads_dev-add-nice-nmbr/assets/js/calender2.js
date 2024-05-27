var separator = ' - ',
    dateFormat = 'DD/MM';
var options = {
    autoUpdateInput: false,
    autoApply: true,
    parentEl: 'body',
    locale: {
        format: dateFormat,
        separator: separator,
        applyLabel: '確認',
        cancelLabel: '取消'
    },
    minDate: moment(),
    maxDate: moment().add(359, 'days'),
    opens: "right",

};


$('[data-datepicker=separateRange]')

    .daterangepicker(options)
    .on('apply.daterangepicker', function (ev, picker) {
        var boolStart = this.name.match(/value_from_start_/g) == null ? false : true;
        var boolEnd = this.name.match(/value_from_end_/g) == null ? false : true;

        var mainName = this.name.replace('value_from_start_', '');
        if (boolEnd) {
            mainName = this.name.replace('value_from_end_', '');
            $(this).closest('form').find('[name=value_from_end_' + mainName + ']').blur();
        }

        $(this).closest('form').find('[name=value_from_start_' + mainName + ']').val(picker.startDate.format(dateFormat));
        $(this).closest('form').find('[name=value_from_end_' + mainName + ']').val(picker.endDate.format(dateFormat));

        $(this).trigger('change').trigger('keyup');
    })
    .on('show.daterangepicker', function (ev, picker) {
        var $picker = picker.container;
        var $input = $(this);
        $input.after($picker);
        var boolStart = this.name.match(/value_from_start_/g) == null ? false : true;
        var boolEnd = this.name.match(/value_from_end_/g) == null ? false : true;
        var mainName = this.name.replace('value_from_start_', '');
        if (boolEnd) {
            mainName = this.name.replace('value_from_end_', '');
        }

        var startDate = $(this).closest('form').find('[name=value_from_start_' + mainName + ']').val();
        var endDate = $(this).closest('form').find('[name=value_from_end_' + mainName + ']').val();

        $('[name=daterangepicker_start]').val(startDate).trigger('change').trigger('keyup');
        $('[name=daterangepicker_end]').val(endDate).trigger('change').trigger('keyup');

        if (boolEnd) {
            $('[name=daterangepicker_end]').focus();
        }
    });




$('[data-datepicker=separateRange]').on('click', () => {
    $("body").addClass("shape-space");
    $(".wrapper").removeClass("space");
    $("#myDropdown").hide();
})





$('.filter__single__item').click(function () {
    $(this).toggleClass('checked');
});
$(document).ready(function () {
    $('#daterange').daterangepicker();

    // Function to handle the class addition/removal based on datepicker display
    function handleDatePickerDisplay() {
        // Check if the datepicker is visible
        if ($('.daterangepicker').is(':visible')) {
            // Add the class to the body
            $('body').addClass('shape-space');
        } else {
            // Remove the class from the body
            $('body').removeClass('shape-space');
        }
    }

    // Call the function initially
    handleDatePickerDisplay();

    // Listen for changes in the datepicker display
    $(document).on('click', function (e) {
        // Check if the click is outside the datepicker
        if (!$(e.target).closest('.daterangepicker').length && !$(e.target).is('#daterange')) {
            // Call the function to handle class addition/removal
            handleDatePickerDisplay();
        }
    });
});


$('[data-datepicker=separateRange]').on('change', () => {
    $("body").removeClass("shape-space");
})