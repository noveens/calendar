/**
 * Calendar App
 *
 * @author Raghu Nayyar
 * @author Georg Ehrke
 * @copyright 2016 Raghu Nayyar <hey@raghunayyar.com>
 * @copyright 2016 Georg Ehrke <oc.list@georgehrke.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

app.factory('CalendarListItem', function(Calendar, WebCal) {
	'use strict';

	function CalendarListItem(calendar) {
		const context = {
			calendar: calendar,
			isEditingShares: false,
			isEditingProperties: false,
			isDisplayingCalDAVUrl: false,
			isDisplayingWebCalUrl: false,
			isSendingMail: false
		};
		const iface = {
			_isACalendarListItemObject: true
		};

		if (!Calendar.isCalendar(calendar)) {
			return null;
		}

		Object.defineProperties(iface, {
			calendar: {
				get: function() {
					return context.calendar;
				}
			}
		});
		
		iface.displayCalDAVUrl = function() {
			return context.isDisplayingCalDAVUrl;
		};

		iface.showCalDAVUrl = function() {
			context.isDisplayingCalDAVUrl = true;
		};

		iface.displayWebCalUrl = function() {
			return context.isDisplayingWebCalUrl;
		};

		iface.hideCalDAVUrl = function() {
			context.isDisplayingCalDAVUrl = false;
		};

		iface.showWebCalUrl = function() {
			context.isDisplayingWebCalUrl = true;
		};

		iface.hideWebCalUrl = function() {
			context.isDisplayingWebCalUrl = false;
		};

		iface.isEditingShares = function() {
			return context.isEditingShares;
		};

		iface.isSendingMail = function() {
			return context.isSendingMail;
		};

		iface.toggleEditingShares = function() {
			context.isEditingShares = !context.isEditingShares;
		};

		iface.toggleSendingMail = function() {
			context.isSendingMail = !context.isSendingMail;
		};

		iface.isEditing = function() {
			return context.isEditingProperties;
		};

		iface.displayActions = function() {
			return !iface.isEditing();
		};

		iface.displayColorIndicator = function() {
			return (!iface.isEditing() && !context.calendar.isRendering());
		};

		iface.displaySpinner = function() {
			return (!iface.isEditing() && context.calendar.isRendering());
		};

		iface.openEditor = function() {
			iface.color = context.calendar.color;
			iface.displayname = context.calendar.displayname;

			context.isEditingProperties = true;
		};

		iface.cancelEditor = function() {
			iface.color = '';
			iface.displayname = '';

			context.isEditingProperties = false;
		};

		iface.saveEditor = function() {
			context.calendar.color = iface.color;
			context.calendar.displayname = iface.displayname;

			iface.color = '';
			iface.displayname = '';

			context.isEditingProperties = false;
		};

		iface.isWebCal = function() {
			return WebCal.isWebCal(context.calendar);
		};

		//Properties for ng-model of calendar editor
		iface.color = '';
		iface.displayname = '';

		iface.order = 0;

		iface.selectedSharee = '';

		return iface;
	}

	CalendarListItem.isCalendarListItem = function(obj) {
		return (typeof obj === 'object' && obj !== null && obj._isACalendarListItemObject === true);
	};

	return CalendarListItem;
});
