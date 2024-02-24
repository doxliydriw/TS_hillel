//Interface Booking which has number and a list of cotnaienrs
interface IBooking
{
    readonly number: string;
    readonly containerList: any[];
}

class Booking implements IBooking
{
    number: string;
    containerList: any[];

    constructor ( bookingNumber: string, containerList: any[] )
    {
        this.number = bookingNumber;
        this.containerList = containerList;
    }
}

//Interface ContaienerService which can add containers to booking and checks whether cargo could be accepted for shipping
interface IContainerService
{
    addContainer ( booking: IBooking, container: any ): void;
    checkCargoAcceptance ( container: any ): boolean;
}

class ContainerService implements IContainerService
{
    addContainer ( booking: IBooking, container: any ): void
    {
        booking.containerList.push( container );
    }

    checkCargoAcceptance ( container: any ): boolean
    {
        return true;
    }
}

//Interface PortService which adds port of loading and port of discharge for Booking
interface IPortService
{
    assignPortOfLoading ( booking: IBooking, port: string ): void;
    assignPortOfDischarge ( booking: IBooking, port: string ): void;
}


class PortService implements IPortService
{
    assignPortOfLoading ( booking: IBooking, port: string ): void
    {
        console.log( `Port of loading assigned to booking ${booking.number}: ${port}` );
    }

    assignPortOfDischarge ( booking: IBooking, port: string ): void
    {
        console.log( `Port of discharge assigned to booking ${booking.number}: ${port}` );
    }
}

// Facade which uses above mentioned classes to complete the Booking
class ShippingFacade
{
    private containerService: IContainerService;
    private portService: IPortService;

    constructor ( containerService: IContainerService, portService: IPortService )
    {
        this.containerService = containerService;
        this.portService = portService;
    }

    addContainerToBooking ( booking: IBooking, container: any ): void
    {
        this.containerService.addContainer( booking, container );
    }

    checkCargoAcceptanceForContainer ( container: any ): boolean
    {
        return this.containerService.checkCargoAcceptance( container );
    }

    assignPortsForBooking ( booking: IBooking, portOfLoading: string, portOfDischarge: string ): void
    {
        this.portService.assignPortOfLoading( booking, portOfLoading );
        this.portService.assignPortOfDischarge( booking, portOfDischarge );
    }
}


const booking = new Booking( "12345", [] );
const containerService = new ContainerService();
const portService = new PortService();
const shippingFacade = new ShippingFacade( containerService, portService );

shippingFacade.addContainerToBooking( booking, { containerNumber: "TEXU4211123", cargo: "Boots" } );
console.log( booking );

const canAccept = shippingFacade.checkCargoAcceptanceForContainer( { containerNumber: "TEXU4211123", cargo: "Boots" } );
console.log( "Can accept cargo:", canAccept );

shippingFacade.assignPortsForBooking( booking, "PortA", "PortB" );
