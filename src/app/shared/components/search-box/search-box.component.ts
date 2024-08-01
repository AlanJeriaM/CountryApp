import { Component,EventEmitter,Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{



  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  //agregada por mi
  @Input()
  public initialValue: string = '';




  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();


  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300) //hasta que el usuario deja de escribir por un segundo no buscara
    )
    .subscribe(value =>{
    this.onDebounce.emit(value);

    })
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();

  }

  emitValue(value:string){
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string){
    this.debouncer.next(searchTerm);

  }



}
