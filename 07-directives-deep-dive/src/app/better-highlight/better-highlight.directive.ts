import { 
  Directive, 
  ElementRef, 
  Renderer2, 
  OnInit, 
  HostListener,
  HostBinding,
  Input,
  Output
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultBackgroundColor: string = 'transparent';
  @Input() highlightBackgroundColor: string = 'blue';
  @Input() defaultColor: string = 'black';
  @Input() highlightColor: string = 'white';
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultBackgroundColor;
  @HostBinding('style.color') color: string = this.defaultColor;
  
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.backgroundColor = this.defaultBackgroundColor;
    this.color = this.defaultColor;
  }

  @HostListener('mouseenter') mouseOver(eventData: Event) {
    /* Use the Renderer setStyle method */
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white');
    this.backgroundColor = this.highlightBackgroundColor;
    this.color = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    /* Use the Renderer setStyle method */
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
    this.backgroundColor = this.defaultBackgroundColor;
    this.color = this.defaultColor;
  }
  
}
