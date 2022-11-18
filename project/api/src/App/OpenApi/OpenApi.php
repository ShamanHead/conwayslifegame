<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Server(
    url: "localhost",
    description: "API Server"
)]
#[OA\Info(
    version: "1",
    title: "Lifeproject API",
    description: "",
)]

class OpenApi {}
