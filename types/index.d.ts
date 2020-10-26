/// <reference types="svelte" />

import { SvelteComponentDev } from 'svelte/internal';


export type SpinnerType = 'default' | 'bubbles' | 'circles' | 'spiral' | 'waveDots';
export type DirectionType = 'top' | 'bottom';


/**
 * InfiniteLoading props
 */
export interface InfiniteLoadingProps {
	/**
	 * The infinite event will be fired if the scroll distance is less than this value. If direction is set to top, it will calculate the
	 * distance between the scroll bar and the top, if direction is set to bottom, it will calculate the distance between the scroll bar
	 *  and the bottom.
	 */
	distance?: number;

	/**
	 * This property is used to set the loading animation, you can choose one of the built-in spinners that you like. You can also use
	 * your own with the spinner slot.
	 */
	spinner?: SpinnerType;

	/**
	 * This property is used to set the load direction.
	 */
	direction?: DirectionType;

	/**
	 * By default, the component will search for the closest parent element which has overflow-y: auto | scroll CSS style as the
	 * scroll container, this property is used to force to specify the scroll container, usually used when the case has complex layout or
	 * 3rd-party scroll plugin.
	 *
	 * If this value set be true, the component will search for the closest parent element which has infinite-wrapper or
	 * data-infinite-wrapper attribute and use it as the scroll container, if this value is a string, the component will use it as a CSS selector,
	 * and search for the element to use as the scroll container via the querySelector API, if all failed, the component will use window
	 * as the scroll container.
	 */
	forceUseInfiniteWrapper?: boolean | string;

	/**
	 * The component will be reset if this property has changed, just like recreating a new component, usually used when the list has
	 * filters or tabs.
	 */
	identifier?: any;
}


/**
 * InfiniteLoading slots
 */
export interface InfiniteLoadingSlots {
	/**
	 * This message will be displayed when there is no data, which means that we have called the InfiniteEvent.details.complete
	 * method, before ever calling the InfiniteEvent.details.loaded method.
	 */
	noResults: {},

	/**
	 * This message will be displayed when there is no more data, which means we have called the InfiniteEvent.details.loaded
	 * method at least once before calling the InfiniteEvent.details.complete method.
	 */
	noMore: {},

	/**
	 * This message will be displayed when loading has failed, which means that we have called the InfiniteEvent.details.error method.
	 */
	error: { attemptLoad: () => void },

	/**
	 * This slot will be displayed when loading data, you can also use your own spinner here.
	 */
	spinner: { isFirstLoad: boolean }
}


/**
 * StateChanger object
 */
export interface StateChanger {
	/**
	 * Inform the component that this loading has been successful. The infinite event will be fired again if the first screen was not be
	 * filled up, otherwise, the component will hide the loading animation and continue to listen to scroll events.
	 */
	loaded (): void;

	/**
	 * Inform the component that all the data has been loaded successfully. If the InfiniteEvent.details.loaded method has not
	 * been called before this, the content of the noResults slot will be
	 * displayed, otherwise, the content of the noMore slot will be displayed.
	 */
	complete (): void;

	/**
	 * Inform the component that loading the data has failed. The content of the error slot will be displayed.
	 */
	error (): void;

	/**
	 * Reset the component. Same as changing the identifier property.
	 */
	reset (): void;
}

/**
 * Infinite event
 */
export interface InfiniteEvent extends CustomEvent<StateChanger> {
}


/**
 * InfiniteLoading events
 */
export interface InfiniteLoadingEvents {
	infinite: InfiniteEvent;
}

/**
 * InfiniteLoading component
 */
export default class InfiniteLoading extends SvelteComponentDev {
	/**
	 * Props
	 *
	 * @internal This is for type checking capabilities only
	 * and does not exist at runtime. Don't use this property.
	 */
	$$prop_def: InfiniteLoadingProps;

	/**
	 * Slots
	 *
	 * @internal This is for type checking capabilities only
	 * and does not exist at runtime. Don't use this property.
	 */
	$$events_def: InfiniteLoadingEvents;

	/**
	 * Events
	 *
	 * @internal This is for type checking capabilities only
	 * and does not exist at runtime. Don't use this property.
	 */
	$$slot_def: InfiniteLoadingSlots;



	constructor (options: {
		// Only allow predefined props:
		props?: InfiniteLoadingProps;

		// Other parameters...
		target: Element;
		anchor?: Element;
		hydrate?: boolean;
		intro?: boolean;
		$$inline?: boolean;
	});

	$set (props: InfiniteLoadingProps): void;

	$on<K extends keyof InfiniteLoadingEvents> (event: K, callback: (event: InfiniteLoadingEvents[K]) => any): () => void;
	$on<T = any>(event: string, callback: (event: CustomEvent<T>) => void): () => void;
}