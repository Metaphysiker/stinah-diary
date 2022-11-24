import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsImageComponent } from './aws-image.component';

describe('AwsImageComponent', () => {
  let component: AwsImageComponent;
  let fixture: ComponentFixture<AwsImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwsImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
