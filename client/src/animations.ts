import {
	trigger,
	animate,
	transition,
	group,
	style,
	query
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
	transition('* => *', [
		query(':enter', [style({ opacity: 0 })], { optional: true }),
		query(
			':leave',
			[style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
			{ optional: true }
		),
		query(
			':enter',
			[style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
			{ optional: true }
		)
	])
]);

// https://stackoverflow.com/questions/37909208/angular-2-slide-in-animation-of-a-routed-component
// with modifications
export const slideAnimation = trigger('slideAnimation', [
	transition('* => *', [
		query(':leave', style({ opacity: 0, position: 'absolute', left: 0, right: 0 , transform: 'translate3d(0%,0,0)'}), {optional:true}),
        query(':enter', style({ opacity: 1, position: 'absolute', left: 0, right: 0, transform: 'translate3d(100%,0,0)'}), {optional:true}),

        group([
            query(':leave', group([
                animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(-100%,0,0)' })), // y: '-100%'
            ]), {optional:true}),
            query(':enter', group([
                animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0%,0,0)' })),
            ]), {optional:true})
        ])
    ])
]);