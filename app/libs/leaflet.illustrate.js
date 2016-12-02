(function(window, document, undefined) {

"use strict";

L.Illustrate = {};

L.Illustrate.version = "0.0.1";
if (L.DomUtil) {
	L.DomUtil.getRotateString = function(angle, units) {
		var is3d = L.Browser.webkit3d,
			open = 'rotate' + (is3d ? '3d' : '') + '(',
			rotateString = (is3d ? '0, 0, 1, ' : '') + angle + units;
			
		return open + rotateString + ')';
	};
}
if (L.DomUtil) {
	L.DomUtil.setTransform = function (el, point, angle, disable3D) {

		// jshint camelcase: false
		el._leaflet_pos = point;

		if (!disable3D && L.Browser.any3d) {
			el.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(point);
			el.style[L.DomUtil.TRANSFORM] = el.style[L.DomUtil.TRANSFORM] + " " + L.DomUtil.getRotateString(angle, 'rad');
		} else {
			// if 3d is disabled, then there is no rotation at all
			el.style.left = point.x + 'px';
			el.style.top = point.y + 'px';
		}
	};
}
L.Map.include({
	_newLayerPointToLatLng: function(point, newZoom, newCenter) {
		var topLeft = L.Map.prototype._getNewTopLeftPoint.call(this, newCenter, newZoom)
				.add(L.Map.prototype._getMapPanePos.call(this));
		return this.unproject(point.add(topLeft), newZoom);
	}
});
if (L.Point) {
	L.Point.prototype._abs =  function() {
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	};
	L.Point.prototype.abs = function() {
		return this.clone()._abs();
	};
}
L.RotatableMarker = L.Marker.extend({

	options: {
		rotation: 0
	},

	initialize: function(latlng, options) {
		L.Marker.prototype.initialize.call(this, latlng, options);
		this.setRotation(this.options.rotation);
	},

	setRotation: function(theta) {
		this._rotation = theta;
		
		this.update();
		this.fire('rotate', { rotation: this._rotation });

		return this;
	},

	getRotation: function() {
		return this._rotation;
	},

	_setPos: function(pos) {
		L.DomUtil.setTransform(this._icon, pos, this._rotation);

		if (this._shadow) {
			L.DomUtil.setTransform(this._shadow, pos, this._rotation);
		}

		this._zIndex = pos.y + this.options.zIndexOffset;

		this._resetZIndex();
	}
});

L.rotatableMarker = function(latlng, options) {
	return new L.RotatableMarker(latlng, options);
};

L.Illustrate.Textbox = L.RotatableMarker.extend({
	statics: {
		TYPE: 'textbox',
		TEXTEDIT_EVENTS: [ 'change', 'keyup', 'paste', 'cut' ]
	},

	includes: [L.Mixin.Events],

	options: {
		/* this._minSize is used by edit handles (L.Illustrate.EditHandle) when updating size. */
		minSize: new L.Point(10, 10),
		textEditable: true,
		textContent: ''
	},

	initialize: function(latlng, options) {
		options.icon = new L.DivIcon({
			className: 'leaflet-illustrate-textbox-container',
			html: '<textarea style="width: 100%; height: 100%">' + this.options.textContent + '</textarea>',
			iconAnchor: new L.Point(0, 0)
		});

		L.RotatableMarker.prototype.initialize.call(this, latlng, options);

		this._textContent = this.options.textContent;
		this._minSize = this.options.minSize;
		
		this.setSize(this.options.size || this._minSize);
	},

	onAdd: function(map) {
		var textarea, editevent;

		L.RotatableMarker.prototype.onAdd.call(this, map);

		textarea = this.getTextarea();

		this.setContent(this._textContent);
		this.setLatLng(this._latlng);
		this._updateSize();

		/* Enable typing, text selection, etc. */
		this._enableTyping();

		/* Disable the textarea if the textbox content should not be editable. */
		if (!this.options.textEditable) {
			textarea.setAttribute('readonly', 'readonly');
		}

		this._addClasses();

		for (var i = 0; i < L.Illustrate.Textbox.TEXTEDIT_EVENTS.length; i++) {
			editevent = L.Illustrate.Textbox.TEXTEDIT_EVENTS[i];
			L.DomEvent.on(textarea, editevent, this._showIfEmpty, this);
		}

		this._showIfEmpty({ target: textarea });
	},

	addTo: function(map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function(map) {
		/* In case the textbox was removed from the map while dragging was disabled. */
		/* (see _enableTyping) */
		this._map.dragging.enable();

		/* Save the text content of the textbox. */
		this.getContent();

		L.RotatableMarker.prototype.onRemove.call(this, map);
	},


	getSize: function() {
		return this._size;
	},

	setSize: function(size) {
		var minWidth = (size.x < this._minSize.x) ? size.x : this._minSize.x,
			minHeight = (size.y < this._minSize.y) ? size.y : this._minSize.y;

		/* If size is smaller than this._minSize, reset this._minSize. */
		this._minSize = new L.Point(minWidth, minHeight);

		this._size = size;

		/* Set size on textarea via CSS */
		if (this._map) {
			this._updateSize();
		}
		this.fire('resize', { size: this._size });

		return this;
	},

	setContent: function(text) {
		this.getTextarea().innerHTML = text;
		return this;
	},

	getContent: function() {
		/* Don't want to call this.getTextarea() if the textbox has been removed from the map. */
		if (this._map) {
			this._textContent = this.getTextarea().value;
		}

		return this._textContent;
	},

	_updateCenter: function() {
		this.setLatLng(this._latlng);
	},

	setStyle: function() {
		// use this to change the styling of the textbox.  should accept an 'options' argument.
		return this;
	},

	getTextarea: function() {
		return this._icon.children[0];
	},

	_updateSize: function() {
		var size = this.getSize();

		if (this._icon) {
			this._icon.style.marginTop = - Math.round(size.y/2) + "px";
			this._icon.style.marginLeft = - Math.round(size.x/2) + "px";
			this._icon.style.width = size.x + "px";
			this._icon.style.height = size.y + "px";
		}
	},

	_onTextEdit: function() {
		if (this._text_edited) {
			this.fire('textedit', { textContent: this.getContent() });
			this._text_edited = false;
		}
	},

	_enableTyping: function() {
		var map = this._map,
			textarea = this.getTextarea(),
			onTextChange = function() {
				this._text_edited = true;
			},
			editevent;

		/* Enable text selection and editing. */
		this._selecting = new L.Illustrate.Selectable(textarea);

		L.DomEvent.on(textarea, 'click', function(event) {
			event.target.focus();
		}, this);

		L.DomEvent.on(textarea, 'mouseover', function() {
			map.dragging.disable();
			this._selecting.enable();
		}, this);

		L.DomEvent.on(textarea, 'mouseout', function() {
			map.dragging.enable();
			this._selecting.disable();
		}, this);

		/* When user leaves the textarea, fire a 'textedit' event if they changed anything. */
		for (var i = 0; i < L.Illustrate.Textbox.TEXTEDIT_EVENTS.length; i++) {
			editevent = L.Illustrate.Textbox.TEXTEDIT_EVENTS[i];
			L.DomEvent.on(textarea, editevent, onTextChange, this);
		}

		L.DomEvent.on(textarea, 'blur', this._onTextEdit, this);
	},

	_showIfEmpty: function(event) {
		var textarea = event.target,
			text = textarea.value;

		if (text === '') {
			L.DomUtil.addClass(textarea, 'leaflet-illustrate-textbox-empty');
		} else {
			L.DomUtil.removeClass(textarea, 'leaflet-illustrate-textbox-empty');
		}
	},

	_addClasses: function() {
		var textarea = this.getTextarea();

		L.DomUtil.addClass(textarea, 'leaflet-illustrate-textbox');

		if (this.options.className) {
			L.Domutil.addClass(textarea, this.options.className);
		}
	}

});

/* Add GeoJSON Conversion */
L.Illustrate.Textbox.prototype.toGeoJSON = function() {
	var size = this.getSize(),
		properties = {
			textContent: this.getContent(),
			style: {
				width: size.x,
				height: size.y,
				rotation: this.getRotation()
			}
		},
		feature = L.GeoJSON.getFeature(this, {
			type: 'Point',
			coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
		});

	feature.properties = properties;

	return feature;
};

L.Illustrate.textbox = function(latlng, options) {
	return new L.Illustrate.Textbox(latlng, options);
};

L.Illustrate.Selectable = L.Handler.extend({

	includes: [L.Mixin.Events],

	statics: {
		START: L.Draggable.START,
		END: L.Draggable.END,
		MOVE: L.Draggable.MOVE
	},

	initialize: function(element, selectStartTarget) {
		this._element = element;
		this._selectStartTarget = selectStartTarget || element;
	},

	addHooks: function() {
		var start = L.Illustrate.Selectable.START;
		L.DomEvent.on(this._selectStartTarget, start.join(' '), this._onDown, this);
	},

	removeHooks: function() {
		var start = L.Illustrate.Selectable.START;
		L.DomEvent.off(this._selectStartTarget, start.join(' '), this._onDown, this);
	},

	_onDown: function(event) {
		L.DomEvent.stopPropagation(event);
	}
});
L.Illustrate.Create = L.Illustrate.Create || {};
L.Illustrate.Create.Textbox = L.Draw.Rectangle.extend({
	statics: {
		TYPE: 'textbox'
	},

	options: {
		/* Set dynamically using this._setShapeOptions() */
		shapeOptions: {},

		/* Change these to match your CSS textbox styles. */
		textOptions: {
			borderColor: '#4387fd',
			borderWidth: 2
		}
	},

	initialize: function(map, options) {
		this.options.textOptions = L.extend({}, this.options.textOptions, options);
		this._setShapeOptions();

		/* 
		 * A <textarea> element can only be drawn from upper-left to lower-right. 
		 * Implement drawing using L.Draw.Rectangle so that a textbox can be drawn in any direction,
		 * then return a L.Illustrate.Textbox instance once drawing is complete.
		 */
		L.Draw.Rectangle.prototype.initialize.call(this, map, options);

		this.type = L.Illustrate.Create.Textbox.TYPE;
	},

	_fireCreatedEvent: function() {
		var latlngs = this._shape.getLatLngs(),
			center = new L.LatLngBounds(latlngs).getCenter(),
			corner = latlngs[1],
			oppositeCorner = latlngs[3],
			cornerPixelCoordinates = this._map.latLngToLayerPoint(corner).round(),
			oppositeCornerPixelCoordinates = this._map.latLngToLayerPoint(oppositeCorner).round(),
			width = oppositeCornerPixelCoordinates.x - cornerPixelCoordinates.x + 2,
			height = oppositeCornerPixelCoordinates.y - cornerPixelCoordinates.y + 2;

		var textbox = new L.Illustrate.Textbox(center, this.options.textOptions)
			.setSize(new L.Point(width, height));

		L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, textbox);
	},

	_setShapeOptions: function() {
		/* shapeOptions are set dynamically so that the Rectangle looks the same as the Textbox. */
		var borderWidth = this.options.textOptions.borderWidth ?
						  this.options.textOptions.borderWidth :
						  2,
			borderColor = this.options.textOptions.borderColor ?
			              this.options.textOptions.borderColor :
			              '#4387fd';

		this.options.shapeOptions = L.extend({}, this.options.shapeOptions, {
			weight: borderWidth,
			color: borderColor,
			fill: false,
			opacity: 1
		});
	}
});
L.Illustrate.Toolbar = L.Toolbar.extend({
	statics: {
		TYPE: 'illustrate'
	},

	options: {
		textbox: {}
	},

	initialize: function(options) {
		// Ensure that the options are merged correctly since L.extend is only shallow
		for (var type in this.options) {
			if (this.options.hasOwnProperty(type)) {
				if (options[type]) {
					options[type] = L.extend({}, this.options[type], options[type]);
				}
			}
		}

		this._toolbarClass = 'leaflet-illustrate-create';
		L.Toolbar.prototype.initialize.call(this, options);
	},

	getModeHandlers: function(map) {
		return [
			{
				enabled: this.options.textbox,
				handler: new L.Illustrate.Create.Textbox(map, this.options.textbox),
				title: 'Add a textbox'
			}
		];
	},

	getActions: function() {
		return [];
	},

	setOptions: function (options) {
		L.setOptions(this, options);

		for (var type in this._modes) {
			if (this._modes.hasOwnProperty(type) && options.hasOwnProperty(type)) {
				this._modes[type].handler.setOptions(options[type]);
			}
		}
	}
});

L.Illustrate.Control = L.Control.Draw.extend({
	initialize: function(options) {
		if (L.version < '0.7') {
			throw new Error('Leaflet.draw 0.2.3+ requires Leaflet 0.7.0+. Download latest from https://github.com/Leaflet/Leaflet/');
		}

		L.Control.prototype.initialize.call(this, options);

		var id,
			toolbar;

		this._toolbars = {};

		/* Initialize toolbars for creating L.Illustrate objects. */
		if (L.Illustrate.Toolbar && this.options.draw) {
			toolbar = new L.Illustrate.Toolbar(this.options.draw);
			id = L.stamp(toolbar);
			this._toolbars[id] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[id].on('enable', this._toolbarEnabled, this);
		}

		/* Initialize generic edit/delete toolbars. */
		if (L.EditToolbar && this.options.edit) {
			toolbar = new L.EditToolbar(this.options.edit);
			id = L.stamp(toolbar);
			this._toolbars[id] = toolbar;

			this._toolbars[id] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[id].on('enable', this._toolbarEnabled, this);
		}
	}
});

L.Map.addInitHook(function() {
	if (this.options.illustrateControl) {
		this.illustrateControl = new L.Illustrate.Control();
		this.addControl(this.illustrateControl);
	}
});

/* Override the _toggleMarkerHighlight method to prevent annoying highlighting of textboxes. */
if (L.EditToolbar.Edit) {
	L.EditToolbar.Edit.prototype._toggleMarkerHighlight = function() {};
}
L.Illustrate.tooltipText = {
	create: {
		toolbar: {
			actions: {

			},
			undo: {

			},
			buttons: {

			}
		},
		handlers: {

		}
	},

	edit: {
		toolbar: {
			actions: {

			},
			undo: {

			},
			buttons: {

			}
		},
		handlers: {
			textbox: {
				tooltip: {
					start: ''
				}
			}
		}
	}
};
L.Illustrate.EditHandle = L.RotatableMarker.extend({
	options: {
		moveIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move'
		}),
		resizeIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize'
		})
	},

	initialize: function(shape, options) {
		L.setOptions(this, options);

		this._handleOffset = new L.Point(options.offset.x || 0, options.offset.y || 0);
		this._handled = shape;

		var latlng = this._handled._map.layerPointToLatLng(this._textboxCoordsToLayerPoint(
				this._handleOffset
			)),
			markerOptions = {
				draggable: true,
				icon: this.options.resizeIcon,
				zIndexOffset: 10
			};

		if (this._handled.getRotation) {
			markerOptions.rotation = this._handled.getRotation();
		}

		L.RotatableMarker.prototype.initialize.call(this, latlng, markerOptions);
	},

	onAdd: function(map) {
		L.RotatableMarker.prototype.onAdd.call(this, map);
		this._bindListeners();
	},

	onRemove: function(map) {
		this._unbindListeners();
		L.RotatableMarker.prototype.onRemove.call(this, map);
	},

	_animateZoom: function(opt) {
		var map = this._handled._map,
			handleLatLng = map._newLayerPointToLatLng(
				this._textboxCoordsToLayerPoint(this._handleOffset, opt), opt.zoom, opt.center
			),
			pos = map._latLngToNewLayerPoint(handleLatLng, opt.zoom, opt.center).round();

		this._setPos(pos);
	},

	updateHandle: function() {
		var rotation = this._handled.getRotation(),
			latlng = this._textboxCoordsToLatLng(this._handleOffset);

		this.setRotation(rotation);
		this.setLatLng(latlng);
	},

	_onHandleDragStart: function() {
		this._handled.fire('editstart');
	},

	_onHandleDragEnd: function() {
		this._fireEdit();
	},

	_fireEdit: function() {
		this._handled.edited = true;
		this._handled.fire('edit');
	},

	_bindListeners: function() {
		this.on({
			'dragstart': this._onHandleDragStart,
			'drag': this._onHandleDrag,
			'dragend': this._onHandleDragEnd
		}, this);

		this._handled._map.on('zoomend', this.updateHandle, this);

		this._handled.on('rotate', this.updateHandle, this);
		this._handled.on('resize', this.updateHandle, this);
		this._handled.on('move', this.updateHandle, this);
	},

	_unbindListeners: function() {
		this.off({
			'dragstart': this._onHandleDragStart,
			'drag': this._onHandleDrag,
			'dragend': this._onHandleDragEnd
		}, this);

		this._handled._map.off('zoomend', this.updateHandle, this);
		this._handled.off('update', this.updateHandle, this);
	},

	_calculateRotation: function(point, theta) {
		return new L.Point(
			point.x*Math.cos(theta) - point.y*Math.sin(theta),
			point.y*Math.cos(theta) + point.x*Math.sin(theta)
		).round();
	},

	/* Perhaps this should be moved to L.Illustrate.Textbox? */
	_layerPointToTextboxCoords: function(point, opt) {
		var map = this._handled._map,
			rotation = this._handled.getRotation(),
			center = this._handled.getLatLng(),
			origin, textboxCoords;

		if (opt && opt.zoom && opt.center) {
			origin = map._latLngToNewLayerPoint(center, opt.zoom, opt.center);
		} else {
			origin = map.latLngToLayerPoint(center);
		}

		/* First need to translate to the textbox coordinates. */
		textboxCoords = point.subtract(origin);

		/* Then unrotate. */
		return this._calculateRotation(textboxCoords, - rotation);
	},

	/* Perhaps this should be moved to L.Illustrate.Textbox? */
	_textboxCoordsToLayerPoint: function(coord, opt) {
		var map = this._handled._map,
			rotation = this._handled.getRotation(),
			center = this._handled.getLatLng(),
			origin, rotated;

		if (opt && opt.zoom && opt.center) {
			origin = map._latLngToNewLayerPoint(center, opt.zoom, opt.center);
		} else {
			origin = map.latLngToLayerPoint(center);
		}

		/* First need to rotate the offset to obtain the layer point. */
		rotated = this._calculateRotation(coord, rotation);

		/* Then translate to layer coordinates. */
		return rotated.add(origin);
	},

	_latLngToTextboxCoords: function(latlng, opt) {
		var map = this._handled._map;

		return this._layerPointToTextboxCoords(map.latLngToLayerPoint(latlng), opt);
	},

	_textboxCoordsToLatLng: function(coord, opt) {
		var map = this._handled._map;

		return map.layerPointToLatLng(this._textboxCoordsToLayerPoint(coord, opt));
	}
	
});
L.Illustrate.MoveHandle = L.Illustrate.EditHandle.extend({
	options: {
		TYPE: 'move'
	},

	_onHandleDrag: function(event) {
		var handle = event.target;

		this._handled.setLatLng(handle.getLatLng());
	}
});

L.Illustrate.ResizeHandle = L.Illustrate.EditHandle.extend({
	options: {
		TYPE: 'resize'
	},

	initialize: function(shape, options) {
		L.Illustrate.EditHandle.prototype.initialize.call(this, shape, options);
		this._corner = options.corner;
	},

	_onHandleDrag: function(event) {
		var handle = event.target,
			offset = this._getOffset(handle.getLatLng());

		this._handled.setSize(offset.abs().multiplyBy(2).round());
	},

	_getOffset: function(latlng) {
		var coord = this._latLngToTextboxCoords(latlng),
			minOffset = this._handled._minSize.divideBy(2),
			x = (Math.abs(coord.x) < minOffset.x) ? minOffset.x : coord.x,
			y = (Math.abs(coord.y) < minOffset.y) ? minOffset.y : coord.y;

		return new L.Point(x,y);
	},

	updateHandle: function() {
		var size = this._handled.getSize(),
			height = Math.round(size.y/2),
			width = Math.round(size.x/2);

		switch (this._corner) {
		case 'upper-left':
			this._handleOffset = new L.Point(-width, height);
			break;
		case 'upper-right':
			this._handleOffset = new L.Point(width, height);
			break;
		case 'lower-left':
			this._handleOffset = new L.Point(-width, -height);
			break;
		case 'lower-right':
			this._handleOffset = new L.Point(width, -height);
			break;
		}

		L.Illustrate.EditHandle.prototype.updateHandle.call(this);
	}
});
L.Illustrate.RotateHandle = L.Illustrate.EditHandle.extend({
	options: {
		TYPE: 'rotate'
	},

	initialize: function(shape, options) {
		L.Illustrate.EditHandle.prototype.initialize.call(this, shape, options);
		this._createPointer();
	},

	onAdd: function(map) {
		L.Illustrate.EditHandle.prototype.onAdd.call(this, map);
		this._map.addLayer(this._pointer);
	},

	onRemove: function(map) {
		this._map.removeLayer(this._pointer);

		L.Illustrate.EditHandle.prototype.onRemove.call(this, map);
	},

	_onHandleDrag: function(event) {
		var handle = event.target,
			latlng = handle.getLatLng(),
			center = this._handled.getLatLng(),
			point = this._map.latLngToLayerPoint(latlng).subtract(this._map.latLngToLayerPoint(center)),
			theta;

		if (point.y > 0) {
			theta = Math.PI - Math.atan(point.x / point.y);
		} else {
			theta = - Math.atan(point.x / point.y);
		}

		/* rotate the textbox */
		this._handled.setRotation(theta);
	},

	updateHandle: function() {
		this._handleOffset = new L.Point(0, -this._handled.getSize().y);

		this._updatePointer();

		L.Illustrate.EditHandle.prototype.updateHandle.call(this);
	},

	_createPointer: function() {
		var textarea = this._handled.getTextarea(),
			borderWidth = L.DomUtil.getStyle(textarea, 'border-width'),
			borderColor = L.DomUtil.getStyle(textarea, 'border-color'),
			options = {
				color: borderColor,
				weight: Math.round(borderWidth)
			};

		this._pointer = new L.Illustrate.Pointer(this._handled.getLatLng(), [], options);
		this._updatePointer();

		this._handled.on({ 'update': this._updatePointer }, this);
	},

	_updatePointer: function() {
		var map = this._handled._map,
			center = this._handled.getLatLng(),
			origin = map.latLngToLayerPoint(center);

		this._pointerStart = this._handleOffset.multiplyBy(0.5);

		this._pointer.setLatLng(center);
		this._pointer.setPoints([
			this._textboxCoordsToLayerPoint(this._pointerStart).subtract(origin),
			this._textboxCoordsToLayerPoint(this._handleOffset).subtract(origin)
		]);
	}
});
L.Illustrate.Edit = L.Illustrate.Edit || {};

L.Illustrate.Edit = L.Illustrate.Edit || {};

L.Illustrate.Edit.Textbox = L.Edit.SimpleShape.extend({
	addHooks: function() {
		/* L.EditToolbar.Edit#_enableLayerEdit enables dragging - but we don't want that. */
		this._shape.dragging.disable();

		if (this._shape._map) {
			this._map = this._shape._map;

			this._initHandles();
			this._initEvents();
		}
	},

	removeHooks: function() {
		if (this._shape._map) {
			this._map.removeLayer(this._handles);
			delete this._handles;
		}

		this._map = null;
	},

	_initHandles: function() {
		if (!this._handles) {

			this._handles = new L.LayerGroup();
			this._map.addLayer(this._handles);

			this._addRotateHandle();
			this._addResizeHandles();
			this._addMoveHandle();
		}
	},

	_initEvents: function() {
		var fireEdit = function() { this._shape.fire('edit'); },
			changeEvents = [ 'resize', 'rotate', 'textedit', 'move' ];

		for (var i = 0; i < changeEvents.length; i++) {
			this._shape.on(changeEvents[i], fireEdit, this);
		}
	},

	_addRotateHandle: function() {
		this._rotateHandle = new L.Illustrate.RotateHandle(this._shape, {
			offset: new L.Point(0, -this._shape.getSize().y)
		});
		this._handles.addLayer(this._rotateHandle);
	},

	_addMoveHandle: function() {
		this._moveHandle = new L.Illustrate.MoveHandle(this._shape, {
			offset: new L.Point(0,0)
		});
		this._handles.addLayer(this._moveHandle);
	},

	_addResizeHandles: function() {
		var size = this._shape.getSize(),
			height = Math.round(size.y/2),
			width = Math.round(size.x/2),
			upperLeft = new L.Illustrate.ResizeHandle(this._shape, {
				offset: new L.Point(-width, -height),
				corner: 'upper-left'
			}),
			upperRight = new L.Illustrate.ResizeHandle(this._shape, {
				offset: new L.Point(width, -height),
				corner: 'upper-right'
			}),
			lowerLeft = new L.Illustrate.ResizeHandle(this._shape, {
				offset: new L.Point(-width, height),
				corner: 'lower-left'
			}),
			lowerRight = new L.Illustrate.ResizeHandle(this._shape, {
				offset: new L.Point(width, height),
				corner: 'lower-right'
			});

		this._resizeHandles = [ upperLeft, upperRight, lowerLeft, lowerRight ];

		for (var i = 0; i < this._resizeHandles.length; i++) {
			this._handles.addLayer(this._resizeHandles[i]);
		}
	}
});

L.Illustrate.Textbox.addInitHook(function() {
	if (L.Illustrate.Edit.Textbox) {
		this.editing = new L.Illustrate.Edit.Textbox(this);

		if (this.options.editable) {
			this.editing.enable();
		}
	}
});

}(window, document));