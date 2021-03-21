import { SimpleEventDispatcher } from 'strongly-typed-events'

import { HubClient } from '../HubClient'

export class HubEventValidation<TValidator> {
    //#region [ fields ]
    private _hub: HubClient;
    private _actions: Array<()=> void | Promise<void>> = [];
    //#endregion

    //#region [ properties ]
    public service: string;
    public event: string;
    public onError = new SimpleEventDispatcher<Error>();
    //#endregion
    constructor ( hub: HubClient, service: string, event: string ) {
        this._hub = hub
        this.service = service
        this.event = event
        hub.onReceive.sub( async publication => {
            if ( publication.service == service && publication.eventName == event ) {
                for ( const action of this._actions ) {
                    if ( action ) {
                        try {
                            const result = action()
                            if ( ( result as any ).then ) {
                                await result
                            }
                        } catch ( err ) {
                            this.onError.dispatch( err )
                        }
                    }
                }
            }
        } )
    }

    on ( action: ()=> void | Promise<void> ): HubEventValidation<TValidator> {
        this._actions.push( action )
        return this
    }
    off (): HubEventValidation<TValidator> {
        this._actions = []
        return this
    }
    subscribe ( credentials: TValidator ): Promise<void> {
        return this._hub.subscribe( this.service, this.event, credentials )
    }
    unsubscribe (): Promise<void> {
        return this._hub.unsubscribe( this.service, this.event )
    }

    sub ( credentials: TValidator ): Promise<void> {
        return this.subscribe( credentials )
    }
    unsub (): Promise<void> {
        return this.unsubscribe()
    }
}
