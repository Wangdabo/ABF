import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { setUpTestBed } from '../../../testing/common.spec';

import { TableStandardComponent } from './standard.component';


describe('Component: TableStandard', () => {
    setUpTestBed(<TestModuleMetadata>{
        declarations: [TableStandardComponent]
    });

    it('should create an instance', () => {
        const fixture = TestBed.createComponent(TableStandardComponent);
        const comp = fixture.debugElement.componentInstance;
        expect(comp).toBeTruthy();
    });
});
