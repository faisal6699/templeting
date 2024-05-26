(function($, undefined) {
    console.log($)
    // Ensure the daterangepicker is loaded
    if (!$.fn.daterangepicker) {
        throw new Error("bootstrap-daterangepicker is required for custom-daterangepicker.js");
    }

    // Save the original renderCalendar function
    var originalRenderCalendar = $.fn.daterangepicker.Daterangepicker.prototype.renderCalendar;

    // Override the renderCalendar function
    $.fn.daterangepicker.Daterangepicker.prototype.renderCalendar = function(calendar, selected, minDate, maxDate) {
        console.log(calendar)
        var html = '<div class="calendar-date">';
        html += '<table class="table-condensed">';
        html += '<thead>';
        html += '<tr>';

        // add empty cell for week number
        if (this.showWeekNumbers)
            html += '<th></th>';

        if (!minDate || minDate.isBefore(calendar.firstDay)) {
            html += '<th class="prev available"><i class="fa fa-arrow-left icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>';
        } else {
            html += '<th></th>';
        }

        var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

        if (this.showDropdowns) {
            dateHtml = this.renderDropdowns(calendar[1][1], minDate, maxDate);
        }

        html += '<th colspan="5" class="month">' + dateHtml + '</th>';
        if (!maxDate || maxDate.isAfter(calendar.lastDay)) {
            html += '<th class="next available"><i class="fa fa-arrow-right icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>';
        } else {
            html += '<th></th>';
        }

        html += '</tr>';
        html += '<tr>';

        // add week number label
        if (this.showWeekNumbers)
            html += '<th class="week">' + this.locale.weekLabel + '</th>';

        $.each(this.locale.daysOfWeek, function (index, dayOfWeek) {
            html += '<th>' + dayOfWeek + '</th>';
        });

        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';

        for (var row = 0; row < 6; row++) {
            html += '<tr>';

            // add week number
            if (this.showWeekNumbers)
                html += '<td class="week">' + calendar[row][0].week() + '</td>';

            for (var col = 0; col < 7; col++) {
                var currentDate = calendar[row][col];
                var cname = 'available ';
                var isCurrentMonth = currentDate.month() === calendar[1][1].month();

                // Skip rendering if the date is not in the current month
                if (!isCurrentMonth) {
                    cname += ' off ';
                }

                if ((minDate && currentDate.isBefore(minDate, 'day')) || (maxDate && currentDate.isAfter(maxDate, 'day'))) {
                    cname = ' off disabled ';
                } else if (currentDate.format('YYYY-MM-DD') == selected.format('YYYY-MM-DD')) {
                    cname += ' active ';
                    if (currentDate.format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
                        cname += ' start-date ';
                    }
                    if (currentDate.format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
                        cname += ' end-date ';
                    }
                } else if (currentDate >= this.startDate && currentDate <= this.endDate) {
                    cname += ' in-range ';
                    if (currentDate.isSame(this.startDate)) { cname += ' start-date '; }
                    if (currentDate.isSame(this.endDate)) { cname += ' end-date '; }
                }

                var title = 'r' + row + 'c' + col;

                // Only render the cell if it's in the current month
                if (isCurrentMonth) {
                    html += '<td class="' + cname.replace(/\s+/g, ' ').replace(/^\s?(.*?)\s?$/, '$1') + '" data-title="' + title + '">' + currentDate.date() + '</td>';
                } else {
                    html += '<td class="' + cname.replace(/\s+/g, ' ').replace(/^\s?(.*?)\s?$/, '$1') + '"></td>';
                }
            }
            html += '</tr>';
        }

        html += '</tbody>';
        html += '</table>';
        html += '</div>';

        var i;
        if (this.timePicker) {
            html += '<div class="calendar-time">';
            html += '<select class="hourselect">';
            var start = 0;
            var end = 23;
            var selected_hour = selected.hour();
            if (this.timePicker12Hour) {
                start = 1;
                end = 12;
                if (selected_hour >= 12)
                    selected_hour -= 12;
                if (selected_hour === 0)
                    selected_hour = 12;
            }

            for (i = start; i <= end; i++) {
                if (i == selected_hour) {
                    html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                } else {
                    html += '<option value="' + i + '">' + i + '</option>';
                }
            }

            html += '</select> : ';

            html += '<select class="minuteselect">';

            for (i = 0; i < 60; i += this.timePickerIncrement) {
                var num = i;
                if (num < 10)
                    num = '0' + num;
                if (i == selected.minute()) {
                    html += '<option value="' + i + '" selected="selected">' + num + '</option>';
                } else {
                    html += '<option value="' + i + '">' + num + '</option>';
                }
            }

            html += '</select> ';

            if (this.timePicker12Hour) {
                html += '<select class="ampmselect">';
                if (selected.hour() >= 12) {
                    html += '<option value="AM">AM</option><option value="PM" selected="selected">PM</option>';
                } else {
                    html += '<option value="AM" selected="selected">AM</option><option value="PM">PM</option>';
                }
                html += '</select>';
            }

            html += '</div>';
        }

        return html;
    };
})(jQuery);

