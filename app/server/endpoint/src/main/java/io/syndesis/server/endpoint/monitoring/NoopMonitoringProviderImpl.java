/*
 * Copyright (C) 2016 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.syndesis.server.endpoint.monitoring;

import java.util.Collections;
import java.util.List;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import io.syndesis.common.model.monitoring.IntegrationDeploymentStateDetails;

@Component
@ConditionalOnProperty(value = "monitoring.kind", havingValue = "noop", matchIfMissing=true)
public class NoopMonitoringProviderImpl implements MonitoringProvider {

    @Override
    public IntegrationDeploymentStateDetails getIntegrationStateDetails(String integrationId) {
        return null;
    }

    @Override
    public List<IntegrationDeploymentStateDetails> getAllIntegrationStateDetails() {
        return Collections.emptyList();
    }
}