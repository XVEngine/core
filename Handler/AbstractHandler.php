<?php

namespace XVEngine\Core\Handler;

use JsonSerializable;

/**
 * Class AbstractHandler
 * @author Krzysztof Bordeux Bednarczyk
 * @package XVEngine\Bundle\CoreBundle\Handler
 */
abstract class AbstractHandler implements JsonSerializable {


    /**
     * Handler name
     * @var string
     */
    protected $name = "";


    /**
     * Handler id
     * @var null|string
     */
    protected $id =  null;

    /**
     * Get name value
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name value
     * @author Krzysztof Bednarczyk
     * @param string $name
     * @return  $this
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get id value
     * @author Krzysztof Bednarczyk
     * @return null|string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set id value
     * @author Krzysztof Bednarczyk
     * @param null|string $id
     * @return  $this
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }





    /**
     * Serialize handler to json
     *
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function jsonSerialize() {
        return array();
    }

}
