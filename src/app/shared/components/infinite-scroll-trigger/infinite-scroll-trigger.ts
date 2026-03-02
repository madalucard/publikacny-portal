import { Component, ElementRef, inject, OnDestroy, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-trigger',
  imports: [],
  templateUrl: './infinite-scroll-trigger.html',
  styleUrl: './infinite-scroll-trigger.scss',
})
export class InfiniteScrollTrigger implements OnInit, OnDestroy {
  readonly triggered = output();

  private readonly el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.triggered.emit();
        }
      },
      { threshold: 0.1 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
