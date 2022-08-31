// Copyright (C) 2021-Present CITEC Inc. <https://citecsolutions.com/>
// All rights reserved
//
// This file is part of CITEC Inc. source code.
// This software framework contains the confidential and proprietary information
// of CITEC Inc., its affiliates, and its licensors. Your use of these
// materials is governed by the terms of the Agreement between your organisation
// and CITEC Inc., and any unauthorised use is forbidden. Except as otherwise
// stated in the Agreement, this software framework is for your internal use
// only and may only be shared outside your organisation with the prior written
// permission of CITEC Inc.
// CITEC Inc. source code can not be copied and/or distributed without the express
// permission of CITEC Inc.

import { renderHook } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'
import { citecApi } from 'features/utils/api/citec-api'
import * as hook from 'features/utils/hooks/use-validate-registered-user'

describe('test at useValidateRegisteredHook', () => {
   const mock = new MockAdapter(citecApi)
   const email = 'test@domain.com'

   test('should return user register if response is 200', async () => {
      mock
         .onGet('/citec/user/', {
            params: {
               email,
            },
         })
         .reply(200, {
            user_id: 8,
            email,
         })

      const { result, waitForNextUpdate } = renderHook(() =>
         hook.useValidateRegisteredUser(email)
      )

      await waitForNextUpdate()

      expect(result.current).toBeTruthy()
   })
})
