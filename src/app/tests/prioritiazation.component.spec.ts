import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrioritizationComponent } from '../prioritization/prioritization.component';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromReducers from '../ngrx/reducers/priority.reducer';
import * as fromSelectors from '../ngrx/selectors/prioritization.selectors';
import * as fromActions from '../ngrx/actions/priority.action';

describe('PrioritizationComponent', () => {
  let component: PrioritizationComponent;
  let fixture: ComponentFixture<PrioritizationComponent>;
  let store: Store;
  let mockSelect: jest.Mock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrioritizationComponent ],
      imports: [
        StoreModule.forRoot({ [fromReducers.prioritizationFeatureKey]: fromReducers.reducer })
      ]
    })
    .compileComponents();

    store = TestBed.inject(Store);

    // Mock the selectors
    mockSelect = jest.fn();
    store.select = mockSelect;

    fixture = TestBed.createComponent(PrioritizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadPriorities action on init', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(fromActions.loadPriorities());
  });

  it('should select priorities from the store', () => {
    const priorities = ['High', 'Medium', 'Low'];
    mockSelect.mockReturnValue(of(priorities));
    component.priorities$.subscribe(result => {
      expect(result).toEqual(priorities);
    });
    
  });

 
});
