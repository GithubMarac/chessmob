import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyzePage } from './analyze.page';

describe('AnalyzePage', () => {
  let component: AnalyzePage;
  let fixture: ComponentFixture<AnalyzePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnalyzePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
